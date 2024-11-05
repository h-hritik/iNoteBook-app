import React from 'react';
import NoteImg from './noteimg.png';

const About = () => {
  return (
    <>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-8">
              <h3 className="fs-5 mb-2 text-secondary text-uppercase">About iNotebook</h3>
              <h2 className="display-5 mb-4">Organize your thoughts and ideas efficiently with iNotebook.</h2>
              <button type="button" className="btn btn-lg btn-primary mb-3 mb-md-4 mb-xl-5">Discover More</button>
            </div>
          </div>
        </div>

        <div className="container overflow-hidden">
          <div className="row gy-4 gy-lg-0">
            <div className="col-12 col-lg-6">
              <article>
                <div className="card border-0">
                  <img className="card-img-top img-fluid m-0" loading="lazy" src={NoteImg} alt="Our Mission"/>
                  <div className="card-body border bg-white p-4">
                    <div className="entry-header mb-3">
                      <h2 className="card-title entry-title h4 mb-0">
                        <a className="link-dark text-decoration-none" href="#!">Our Mission</a>
                      </h2>
                    </div>
                    <p className="card-text entry-summary text-secondary mb-3">iNotebook is committed to providing a seamless and intuitive note-taking experience for users of all backgrounds. Our mission is to help you organize your thoughts and ideas efficiently.</p>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-12 col-lg-6">
              <article>
                <div className="card border-0">
                  <img className="card-img-top img-fluid m-0" loading="lazy" src={NoteImg} alt="Our Features"/>
                  <div className="card-body border bg-white p-4">
                    <div className="entry-header mb-3">
                      <h2 className="card-title entry-title h4 mb-0">
                        <a className="link-dark text-decoration-none" href="#!">Our Features</a>
                      </h2>
                    </div>
                    <p className="card-text entry-summary text-secondary mb-3">iNotebook offers an easy-to-use interface, secure and private note storage, cross-platform synchronization, and rich text editing capabilities to enhance your productivity.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
