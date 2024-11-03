import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { searchPeople } from '../../fetchData';

export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query');
        console.log('searchParams', query)
        const page = searchParams.get('page') || '1';
        console.log('page', page)

        // Fetch data from external API
        const data = await searchPeople(query, page)

        console.log('data', data)

        // Return the response
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch movies' },
            { status: 500 }
        );
    }
}