import React from 'react'
import "./footer.css" ;

export default function Footer() {
  return (
    <footer className='pt-4 pb-5 text-light position-relative' style={{backgroundColor:"var(--main-bg-color)"}}>
     <div className='container'>
     <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-lg-3 col-md-6 text-center me-3'>
                <h2 className='footer-logo text-capitalize mb-3'>cinematex</h2>
                <p className='desc text-capitalize'>this site show all trending actors , movie and series on one place</p>
            </div>
            <div className='col-lg-3 col-md-6 text-center me-3'>
                <h4 className='footer-logo text-capitalize mb-3'>social media</h4>
                <p className='desc text-capitalize'>follow us on all our social media platform</p>
                <div className='social-media-container'>
                <i className="fa-brands fa-facebook fa-2x fa-fw me-2"></i>
                <i className="fa-brands fa-instagram fa-2x fa-fw me-2"></i>
                <i className="fa-brands fa-tiktok fa-2x fa-fw me-2"></i>
                <i className="fa-brands fa-youtube fa-2x fa-fw me-2"></i>
                </div>
            </div>

        </div>
     </div>
    </footer>
  )
}
