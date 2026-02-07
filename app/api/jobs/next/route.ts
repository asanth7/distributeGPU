import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const taskId = searchParams.get('taskId');

        if (!taskId) {
            return NextResponse.json({ error: 'taskId is required' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            const query = `
            SELECT j.id, j.task_id, j.x, j.y, j.width, j.height, j.status, j.created_at,
                   t.scene_mesh_url, t.scene_bvh_url, t.scene_textures_url,
                   t.cam_position_x, t.cam_position_y, t.cam_position_z,
                   t.cam_target_x, t.cam_target_y, t.cam_target_z,
                   t.fov, t.width as task_width, t.height as task_height, t.max_bounces
            FROM jobs j
            JOIN tasks t ON j.task_id = t.id
            WHERE j.task_id = $1 AND j.status = 'created'
            ORDER BY j.y, j.x
            LIMIT 1
        `;
            const result = await client.query(query, [taskId]);

            if (result.rowCount === 0) {
                return NextResponse.json({ message: 'No available jobs' }, { status: 404 });
            }

            return NextResponse.json({ job: result.rows[0] });

        } finally {
            client.release();
        }
    } catch (error: any) {
        console.error('Error fetching next job:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
