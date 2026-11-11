import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'


import LandingPage from './stores/pages/LandingPage'
import MobilePage from './stores/pages/MobilePage'
import WatchPage from './stores/pages/WatchPage'
import MenPage from './stores/pages/MenPage'
import WomanPage from './stores/pages/WomanPage'
import FurniturePage from './stores/pages/FurniturePage'
import AcPage from './stores/pages/AcPage'
import ComputerPage from './stores/pages/ComputerPage'
import KitchenPage from './stores/pages/KitchenPage'
import TvPage from './stores/pages/TvPage'
import FridgePage from './stores/pages/FridgePage'
import SpeakerPage from './stores/pages/SpeakerPage'


import MobileSingle from './singles/MobileSingle'
import UserCart from './stores/UserCart'
import ComputerSingle from './singles/ComputerSingle'
import FurnitureSingle from './singles/FurnitureSingle'
import KitchenSingle from './singles/KitchenSingle'
import MenSingle from './singles/MenSingle'
import WomanSingle from './singles/WomanSingle'
import WatchSingle from './singles/WatchSingle'
import AcSingle from './singles/AcSingle'
import FridgeSingle from './singles/FridgeSingle'
import TvSingle from './singles/TvSingle'
import SpeakerSingle from './singles/SpeakerSingle'
import BooksSingle from './singles/BooksSingle'
import BookPage from './stores/pages/BookPage'
import Navbar from './stores/components/Navbar'
import { ToastContainer, toast } from 'react-toastify';



const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element = {<LandingPage />} />
        <Route path='/kitchen' element = {<KitchenPage />} />
        <Route path='/mobiles' element = {<MobilePage />} />
        <Route path='/watch' element = {<WatchPage />} />
        <Route path='/men' element = {<MenPage />} />
        <Route path='/woman' element = {<WomanPage />} />
        <Route path='/furniture' element = {<FurniturePage />} />
        <Route path='/ac' element = {<AcPage />} />
        <Route path='/computers' element = {<ComputerPage />} />
        <Route path='/fridge' element={<FridgePage />} />
        <Route path='/tv' element={<TvPage />} />
        <Route path="/speaker" element={<SpeakerPage />} />
        <Route path='/book' element={<BookPage />} />


        <Route path='/mobiles/:id' element = {<MobileSingle />} />
        <Route path="/computers/:id" element={<ComputerSingle />} />
        <Route path="/furniture/:id" element={<FurnitureSingle />} />
        <Route path='/kitchen/:id' element={<KitchenSingle />} />
        <Route path="/men/:id" element={<MenSingle />} />
        <Route path='/woman/:id' element={<WomanSingle />} />
        <Route path='/watch/:id' element={<WatchSingle />} />
        <Route path='/ac/:id' element={<AcSingle />} />
        <Route path='/fridge/:id' element={<FridgeSingle />} />
        <Route path='/tv/:id' element={<TvSingle />} />
        <Route path='/speaker/:id' element={<SpeakerSingle />} />
        <Route path='/book/:id' element={<BooksSingle />} />


        <Route path='/cart' element={<UserCart />} />
        
      </Routes>
    </div>
  )
}

export default App