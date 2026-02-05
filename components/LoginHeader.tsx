

const LoginHeader = () => { 
    return (
        <header class="dashboard-header">
        <h1>Welcome</h1>
        <form action="/api/logout" method="POST">
          <button type="submit" class="logout-btn">Logout</button>
        </form>
      </header>
    );
}

export default LoginHeader;