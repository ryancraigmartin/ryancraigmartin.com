import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ryan Craig Martin</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          referrerpolicy="no-referrer"
        />
      </Head>

      <body>
        <div className="wrap">
          <div className="profile">
            <h1 className="profile_name">Ryan Craig Martin</h1>
            <h2 className="at">@ryancraigmartin</h2>
            {/* <div className="card"></div> */}
          </div>
          <div className="links">
            <ul>
              <li className="shake">
                <a href="https://www.instagram.com/ryancraigmartin" className="link">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li className="shake">
                <a href="https://www.twitter.com/ryancraigmartin" className="link">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li className="shake">
                <a href="https://www.linkedin.com/in/ryancraigmartin/" className="link">
                  Linked<i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li className="shake">
                <a
                  href="https://open.spotify.com/user/1230181600?si=224fb6f0b902456f"
                  className="link"
                >
                  <i className="fab fa-spotify"></i> Follow on Spotify
                </a>
              </li>
              <li className="shake">
                <a
                  href="https://open.spotify.com/playlist/1jzF8m0S75XQB5mPtq6Q7f?si=585cb45b69764772"
                  className="link"
                >
                  <i className="fas fa-headphones-alt"></i> Discover New Music
                </a>
              </li>
              <li className="shake">
                <a href="https://github.com/ryancraigmartin" className="link">
                  <i className="fab fa-github"></i> Github
                </a>
              </li>
              <li className="shake">
                <a href="https://www.youtube.com/channel/UCvV0JZfZDxo_o-tz9VZz2hw" className="link">
                  <i className="fab fa-youtube"></i> Subscribe on YouTube
                </a>
              </li>
              <li className="shake">
                <a href="mailto:contact@ryanmartin.io" subject="👋🏼" className="link">
                  <i className="far fa-envelope"></i> Email Me
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="card"></div> */}
        </div>
      </body>
    </>
  )
}
