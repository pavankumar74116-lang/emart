import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className="navSection">
        <div className="title">
            <Link to ="/">
            <h4>E-mart</h4>
            </Link>
            <div className='icons'>
            <a href="https://www.linkedin.com/in/pavan-kumar-41a8622b8"
            target='_blank'
            >
        <i className='fa-brands fa-linkedin'></i>
    
            </a>
        <a href="https://github.com/pavankumar74116-lang"
        target='_blank'
        >
        <i className='fa-brands fa-github'></i>
        </a>
        <a href="./public/assets/pavan_resumeee.pdf"
        target='_blank'>
        <i class="fa-solid fa-download"><span className='download'>Download CV</span></i>
        </a>
        </div>
            </div>
        <div className="search">
            <input type="text" placeholder='Search...'/>
        </div>



        <div className="user">
            <div className="user-detail">
                <h4>SignIn/SignUp</h4>
            </div>
            
            <Link to='/cart'>
            <div className="cart">
                <h4>Cart</h4>
            </div>
            </Link>
            
        </div>
    </div>
    <div className="main">
        {/* <div className="left">
            <h1>Image1</h1>
        </div>
        <div className="left">
            <h1>Image2</h1>
            <h2>sdkfhkjdofhjwfnjwlierwkjlfn;dljskdhmhs,nbcvm;dla;sdkf</h2>
        </div>
        <div className="left">
            <h1>Image2</h1>
            <h2>sdkfhkjdofhjwfnjwlierwkjlfn;dljskdhmhs,nbcvm;dla;sdkf</h2>
        </div> */}
    </div>
    <div className="subMenu">
        <ul>
            <Link to="/mobiles">
            <li>Mobiles</li>
            </Link>

            <Link to ="/computers">
            <li>Computers</li>
            </Link>

            <Link to="/watch">
             <li>Watches</li>
            </Link>

            
            <Link to ="/men">
            <li>Mens</li>
            </Link>

            <Link to ="/woman">
            <li>Womens</li>
            </Link>

            <Link to ="/furniture">
            <li>Furnitures</li>
            </Link>

            <Link to="/ac">
            <li>AC</li>
            </Link>

            <Link to="/kitchen">
            <li>Kitchens</li>
            </Link>

            <Link to="/fridge">
             <li>Fridge</li>
            </Link>

            
            <Link to ="/tv">
            <li>Tv</li>
            </Link>

            <Link to ="/speaker">
            <li>Speaker</li>
            </Link>

            <Link to ="/book">
            <li>Books</li>
            </Link>

        </ul>
    </div>
    </>
  )
}

export default Navbar