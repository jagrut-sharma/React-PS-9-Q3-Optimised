import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <h3>Welcome to neoG Food Ordering App</h3>
      <p>Click below button to go to menu page.</p>
      <div>
        <button>
          <Link className="link" to="/menu">
            Menu Page
          </Link>{" "}
        </button>
      </div>
    </>
  );
}
