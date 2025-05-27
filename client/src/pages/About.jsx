import TeamSection from '../components/TeamSection';

function About() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">About Us</h1>
      <p className="mb-4">At Equinox Automotive, we’re driven by excellence and powered by integrity. 
        With a team of highly skilled technicians and a commitment to top-tier service, we provide reliable, transparent,
        and efficient auto care that keeps our customers confidently on the road.</p>
      <TeamSection />
    </div>
  );
}

export default About;