import React from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'; // Assuming you have a styles.css file for ShadCN styles

const ActorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="actor-page">
            <header className="actor-header">
                <h1>Actor Details</h1>
            </header>
            <main className="actor-content">
                <section className="actor-info">
                    <h2>Actor ID: {id}</h2>
                    {/* Add more actor details here */}
                </section>
                <section className="actor-movies">
                    <h2>Movies</h2>
                    {/* Add a list of movies here */}
                </section>
            </main>
            <footer className="actor-footer">
                {/* Add footer content here */}
            </footer>
        </div>
    );
};

export default ActorPage;
