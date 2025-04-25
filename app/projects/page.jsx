import { Card } from '../../components/card';

export default function ProjectsPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1>My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <h3>Project 1</h3>
                    <p>Description of project 1</p>
                </Card>
                <Card>
                    <h3>Project 2</h3>
                    <p>Description of project 2</p>
                </Card>
                <Card>
                    <h3>Project 3</h3>
                    <p>Description of project 3</p>
                </Card>
            </div>
        </div>
    );
} 