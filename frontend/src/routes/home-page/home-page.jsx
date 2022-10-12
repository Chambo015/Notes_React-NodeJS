import heroImg  from '../../assets/hero.png'
import Header from '../../components/header/Header'
import './home-page.scss'
const bgImage = 'https://images.unsplash.com/photo-1519284053930-16dfacdc7c98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'


export default function HomePage() {
  return (
    <div className='home_page'>
      <Header bgImage={bgImage} />
      <main className='container'>
        <div className='hero_block'>
          <div className='hero_text'>
            <h1>Where does it come from</h1>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
            <button>More</button>
          </div>
          <div className='hero_img'>
              <img src={heroImg}   alt="" />
          </div>
        </div>
      </main>
    </div>
  )
}