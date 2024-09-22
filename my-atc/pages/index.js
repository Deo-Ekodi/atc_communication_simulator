// pages/index.js
import Layout from '../components/Layout';
import Link from 'next/link';

const Home = () => {
    return (
        <Layout>
            <h2>Welcome to the Simulation</h2>
            <Link href="/pilot">Pilot Page</Link>
            <Link href="/atc">ATC Page</Link>
        </Layout>
    );
};

export default Home;
