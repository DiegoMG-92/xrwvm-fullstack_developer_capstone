import React from 'react';
import team1 from '../assets/img/team-1.jpg';
import team2 from '../assets/img/team-2.jpg';
import team3 from '../assets/img/team-3.jpg';
import team4 from '../assets/img/team-4.jpg';

const technicians = [
  { id: 1, name: 'Jordan Hayes', role: 'Chief Operations Officer', img: team1, delay: '0.1s' },
  { id: 2, name: 'Marcus Bennett', role: 'Head of Customer Experience', img: team2, delay: '0.3s' },
  { id: 3, name: 'Alfonso Martinez', role: 'Lead Automotive Engineer', img: team3, delay: '0.5s' },
  { id: 4, name: 'Travis Anderson', role: 'Technical Services Coordinator', img: team4, delay: '0.7s' },
];

const TeamSection = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 className="mb-5">Meet our Team</h1>
        </div>
        <div className="row g-4">
          {technicians.map((tech) => (
            <div key={tech.id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={tech.delay}>
              <div className="team-item">
                <img className="img-fluid" src={tech.img} alt={tech.name} />
                <div className="bg-light text-center p-4">
                  <h5 className="fw-bold mb-0">{tech.name}</h5>
                  <small>{tech.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;