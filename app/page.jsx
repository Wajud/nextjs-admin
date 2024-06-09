import Link from "next/link";

const Homepage = () => {
  return (
    <div>
      <p>Homepage</p>
      <Link href="/dashboard">Dashboard Page</Link>
    </div>
  );
};

export default Homepage;
