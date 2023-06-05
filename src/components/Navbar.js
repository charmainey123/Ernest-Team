export default function Navbar() {
    return (
        <nav className="nav">
            <h1 className="site-title">SC Bank</h1>
            <ul>
                <li>
                    <a href="/about"><b>Home</b></a>
                </li>
                <li>
                    <a href="/pricing"><b>Form</b></a>
                </li>
            </ul>
        </nav>
    )
}