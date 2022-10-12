import { Outlet } from 'react-router-dom'
import Navigate from '../components/navigate/Navigate'
export default function Root() {
  return (
   
      <>
        <Navigate />
  
        <div className='outlet'><Outlet /></div>
      
      </>
    
  )
}