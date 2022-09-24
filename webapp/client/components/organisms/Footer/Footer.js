// import React from 'react';

// import Footer from 'react-bulma-companion/lib/Footer';
// import Container from 'react-bulma-companion/lib/Container';
// import Content from 'react-bulma-companion/lib/Content';

// export default function FooterComponent() {
//   const year = new Date().getFullYear();

//   return (
//     <Footer>
//       <Container>
//         <Content className="has-text-centered">
//           <p>
//             {`Copyright Ⓒ ${year} MERN Boilerplate. All Rights Reserved.`}
//           </p>
//         </Content>
//       </Container>
//     </Footer>
//   );
// }

import React from 'react'
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import Footer from 'react-bulma-companion/lib/Footer'
// import './css/font-awesome.min.css';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'
export default function FooterComponent() {
  return (
    <Footer>
      <MDBFooter color='black' className='font-small pt-4 mt-4'>
        <MDBContainer className='text-center text-md-left'>
          <MDBRow className='text-center text-md-left mt-3 pb-3'>
            <MDBCol md='3' lg='3' xl='3' className='mx-auto mt-3'>
              <h6 className='text-uppercase mb-4 font-weight-bold'>
                Delivering smiles all the time!
              </h6>
              <p>
                We make sure our Partners follow the standards set by Food and
                Drug Adminstration(FDA)
              </p>
            </MDBCol>
            <hr className='w-100 clearfix d-md-none' />
            <MDBCol md='2' lg='2' xl='2' className='mx-auto mt-3'>
              <h6 className='text-uppercase mb-4 font-weight-bold'>Top Cusines near Me</h6>
              <p>
                <a href='#!'>Pizza Near Me</a>
              </p>
              <p>
                <a href='#!'>Sushi Near Me</a>
              </p>
              <p>
                <a href='#!'>SeaFood Near Me</a>
              </p>
              <p>
                <a href='#!'>Coffee Near Me</a>
              </p>
            </MDBCol>
            <hr className='w-100 clearfix d-md-none' />
            <MDBCol md='3' lg='2' xl='2' className='mx-auto mt-3'>
              <h6 className='text-uppercase mb-4 font-weight-bold'>
              Let us Help You
              </h6>
              <p>
                <a href='#!'>Become an Affiliate</a>
              </p>
              <p>
                <a href='#!'>Account Details</a>
              </p>
              <p>
                <a href='#!'>Help</a>
              </p>
            </MDBCol>
            <hr className='w-100 clearfix d-md-none' />
            <MDBCol md='4' lg='3' xl='3' className='mx-auto mt-3'>
              <h6 className='text-uppercase mb-4 font-weight-bold'>Contact</h6>
              <p>
                <i className='fa fa-home mr-3' /> Boston, MA 02120, US
              </p>
              <p>
                <i className='fa fa-envelope mr-3' /> info@fooddelivery.com
              </p>
              <p>
                <i className='fa fa-phone mr-3' /> + 01 234 567 88
              </p>
              <p>
                <i className='fa fa-print mr-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className='d-flex align-items-center'>
            <MDBCol md='8' lg='8'>
              <p className='text-center text-md-left grey-text'>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a href='https://www.MDBootstrap.com'> Food Delivery </a>
              </p>
            </MDBCol>
            <MDBCol md='4' lg='4' className='ml-lg-0'>
              <div className='text-center text-md-right'>
                <ul className='list-unstyled list-inline'>
                  <li className='list-inline-item'>
                    <a className='btn-floating btn-sm rgba-white-slight mx-1'>
                      <i className='fab fa-facebook-f' />
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='btn-floating btn-sm rgba-white-slight mx-1'>
                      <i className='fab fa-twitter' />
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='btn-floating btn-sm rgba-white-slight mx-1'>
                      <i className='fab fa-google-plus' />
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='btn-floating btn-sm rgba-white-slight mx-1'>
                      <i className='fab fa-linkedin-in' />
                    </a>
                  </li>
                </ul>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBFooter>
    </Footer>
  )
}
