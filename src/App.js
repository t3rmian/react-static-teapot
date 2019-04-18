import './app.css';

import { Link, Router } from 'components/Router';
import Dynamic from 'containers/Dynamic';
import Search from 'pages/search';
import React from 'react';
import { addPrefetchExcludes, Head, Root, Routes } from 'react-static';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <Head>
        <title>react-static-teapot</title>
        <meta name="robots" content="noindex" />
      </Head>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/search">Search</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
