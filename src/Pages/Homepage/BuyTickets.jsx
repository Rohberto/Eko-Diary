import React, {useState} from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { PaystackButton } from 'react-paystack'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const BuyTickets = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {events, loading} = useSelector((state) => state.events);
    const {user} = useSelector((state) => state.user);
    const current_event = events.find((event) => event._id == id);
    const [qty, setQty] = useState(1);
    const [isContact, setIsContact] = useState(false)
    const [error, setError] = useState("");
    const [ email, setEmail ] = useState("");
  const [ firstname, setFirstName ] = useState("");
  const [ lastname, setLastName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [modal, setModal] = useState(false);
  const [ticket_loading, setLoading] = useState(false);
    const publicKey = "pk_live_7c27696b8c1eea8cac71ba28b136a3ad296be254";
    const base_url = "https://new-eko-diary.onrender.com";
      //current_event.price.ticket_price * qty,
    

  const generateTicket = async () => {
    const body = {
      userId: user._id,
      eventId: current_event._id,
      email,
      amountPaid: current_event.price.ticket_price * qty,
      quantity: qty,
      firstname
    }
    try{
      setLoading(true)
      if(!user._id || !current_event || !email || !firstname ){
        console.log("error");
        return setError("Fill Out all Input fields");
      } else{
      const request = await axios.post(`${base_url}/tickets`, body)
      const response = request.data;
      console.log(response);
      if(response.status === "SUCCESS"){
        setModal(true);
      } else{
        setError(response.data);
      }
     
    }
    }catch (err) {
setError(err.message);
console.log(err.message);
    }
    finally{
      setLoading(false);
      setEmail("");
      setLastName("");
      setFirstName("");
      setPhone("")
    }
  }
    const componentProps = {
    email,
    amount: 10000,
    metadata: {
      firstname,
      lastname,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => generateTicket,
    onClose: () => alert("Wait! You need to donate, don't go!!!!"),
  }
    return (
    <div className='tickets_container'>
      {
        loading ? (<div className='hour'><div class="lds-hourglass"></div></div>) : ( 
        <>
        <h1 className='checkout_title'>Checkout</h1>
        <div className="checkout_state">
            <div className="ticket_state">
            <input type="radio" name="tickets" id="tickets" checked/>
            <label for="tickets">TIckets</label>
            </div>
              <hr/>
            <div className="contact_state">
            <input type="radio" name="contact" id="ticket_contact"  />
            <label for="ticket_contact">Contact</label>
            </div>
        </div>
{
    !isContact ? ( <>
        <div className="checkout_top_container">
            <div className="back_button" onClick={() => navigate("/")}>
                <FaArrowLeft/>
            </div>
            <h1>Choose Tickets</h1>
        </div>

        <div className="checkout_ticket">
            <h4>{current_event.name}</h4>
            <div className="ticket_quantity">
            <button
                  className="qty_button"
                  onClick={() => {
                    setQty(qty => qty + 1)
                  }}
                >
                  +
                </button>
                <p>{qty}</p>
                <button
                  className="qty_button"
                  onClick={() => {
                    if(qty > 1){
                        setQty(qty => qty - 1); 
                    }
         }}
                >
                  -
                </button>
            </div>
        </div>

    <div className="checkout_ticket_info">
        {current_event.price.ticket_price === 0 ? (
            <>
            <h5>Free</h5>
            <p>Ticket prices are free and you would not be charged for the purchase of this ticket.</p>
            </>
        ) : (
            <>
                <h5 style={{color: "white"}}>&#8358;{current_event.price.ticket_price * qty}</h5>
                <p>You would be charged &#8358;{`${current_event.price.ticket_price * qty}`} for the purchase of this ticket.</p>
            </>
        )}
    </div>

    <div className="bottom_ticket">
      <div className="buy_background">
        <p>&#8358;{current_event.price.ticket_price === 0 ? '0' : `${current_event.price.ticket_price * qty}`}</p>
        <button onClick={() => {setIsContact(true)
          document.querySelector('#ticket_contact').checked = true
        }}>Continue</button>
        </div>
    </div>
    </> 
    ) : (
        <div className='ticket_contact_container'>
            <div className="ticket_contact_heading">
            <div className="back_button"  onClick={() => navigate("/")}>
                <FaArrowLeft/>
            </div>
            <h1>Choose Tickets</h1>
            </div>

            <div className="ticketFormContainer">
        <div className="inputContainer">
        <label for="firstname">firstname</label>
        <input type="text" name="firstname" id="ticket-firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
      </div> 

        <div className="inputContainer">
        <label for="lastname">lastname</label>
        <input type="text" name="lastname" id="ticket-lastname" value={lastname} onChange={(e) => setLastName(e.target.value)}  />
      </div>

      <div className="inputContainer">
        <label for="email">email:</label>
        <input type="email" name="email" id="ticket-email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="inputContainer">
        <label for="phone">phone:</label>
        <input type="tel" name="phone" id="ticket-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
</div>

<div className="bottom_ticket">
  <div className="buy_background">
        <p>{current_event.price.ticket_price === 0 ? 'Free' : `${current_event.price.ticket_price * qty}`}</p>
    
        {current_event.price.ticket_price === 0 ? (
            <>
          <button onClick={generateTicket}>{ticket_loading ? 'Loading' : 'Continue'}</button>
            </>
        ) : (
            <>
               <PaystackButton  {...componentProps} />
            </>
        )}
    </div>
    </div>

 </div>
    )
}
{
  //Modal
modal && (

  <div className="modal-dialog">

    <div className="modal-content">
      <button className="modal_close" onClick={() => setModal(false)}>&times;</button>
      <div class="page-body">
    <div class="head">  
      <h3>Your Ticket Purchas was successful.</h3>
      <h4>{`Hi ${firstname}, Check your mail for your tickets.`}</h4>
    </div>

      <div className="modal_button">
        <button><Link to="/homepage">Continue To Homepage</Link></button>
      </div>
</div>
</div>
    </div>


)
}
</>)
}
    </div>
    
  )
}

export default BuyTickets;
