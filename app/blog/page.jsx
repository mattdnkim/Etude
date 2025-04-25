import Card from '@/components/card';

export default function BlogPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1>Blog</h1>
            <div className="flex flex-col gap-6">
                <Card>
                    <h3>Blog Post 1</h3>
                    <p>Summary of blog post 1</p>
                    <p className="text-sm text-gray-500">Published on: January 1, 2024</p>
                </Card>
                <Card>
                    <h3>Blog Post 2</h3>
                    <p>Summary of blog post 2</p>
                    <p className="text-sm text-gray-500">Published on: February 1, 2024</p>
                </Card>
            </div>
        </div>
    );
} 