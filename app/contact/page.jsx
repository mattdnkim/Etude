import Card from '@/components/card';
import { FeedbackForm } from '../../components/feedback-form';

export default function ContactPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1>Contact Me</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h3>Get in Touch</h3>
                    <p>Feel free to reach out to me through the form below or via email.</p>
                    <div className="mt-4">
                        <p>Email: your.email@example.com</p>
                        <p>Location: Your Location</p>
                    </div>
                </Card>
                <FeedbackForm />
            </div>
        </div>
    );
} 