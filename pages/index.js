import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ryan Craig Martin</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>

      <body>
        <div class="wrap">
          <div class="profile">
            <h1 class="profile_name">Ryan Craig Martin</h1>
            <h2 class="at">@ryancraigmartin</h2>
            {/* <div class="card"></div> */}
          </div>
          <div class="links shake">
            <ul>
              <li>
                <a href="https://www.instagram.com/ryancraigmartin" class="link">
                  <i class="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/ryancraigmartin" class="link">
                  <i class="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ryancraigmartin/" class="link">
                  Linked<i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/user/1230181600?si=224fb6f0b902456f" class="link">
                  <i class="fab fa-spotify"></i> Follow on Spotify
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/playlist/1jzF8m0S75XQB5mPtq6Q7f?si=585cb45b69764772"
                  class="link"
                >
                  <i class="fas fa-headphones-alt"></i> Discover New Music
                </a>
              </li>
              <li>
                <a href="https://github.com/ryancraigmartin" class="link">
                  <i class="fab fa-github"></i> Github
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCvV0JZfZDxo_o-tz9VZz2hw" class="link">
                  <i class="fab fa-youtube"></i> Subscribe on YouTube
                </a>
              </li>
              <li>
                <a href="mailto:contact@ryanmartin.io" subject="👋🏼" class="link">
                  <i class="far fa-envelope"></i> Email Me
                </a>
              </li>
            </ul>
          </div>
          {/* <div class="card"></div> */}
        </div>
      </body>
    </>
  )
}
