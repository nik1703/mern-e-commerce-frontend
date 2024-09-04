import { FaAngleDown } from 'react-icons/fa6';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Login from '../components/Login';
import Register from '../components/Register';

function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white mt-2 relative rounded-lg p-6">
      <div className='border-2 border-gray-400 rounded-lg opacity-100 shadow-xl hover:shadow-2xl transition duration-900 ease-in-out relative z-10 py-3 px-6 w-full max-w-lg'>
        

        {/* Login-B */}
        <div className="w-full">
          <h3 className="font-integral_cf text-2xl font-bold text-black mb-2">Login</h3>
          
          <Login />
        </div>

        {/* Register-Bereich */}
        <Accordion className="w-full" elevation={0}>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <h3 className="text-black font-satoshi_bold mb-0">No account yet? Register here.</h3>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col space-y-2 w-full">
              <p className="font-integral_cf text-2xl font-bold text-black mb-0">Register</p>
              <Register />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default AuthPage;
