import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchPopularPeople } from '@/app/api/fetchData';

export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get('page') || '1';
        console.log('page', page)

        // Fetch data from external API
        const data = await fetchPopularPeople(page)

        console.log('data', data)

        // Return the response
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch popular actors' },
            { status: 500 }
        );
    }
}