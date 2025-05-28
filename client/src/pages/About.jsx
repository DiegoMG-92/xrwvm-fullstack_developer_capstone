import TeamSection from '../components/TeamSection';
import PageHeader from '../components/PageHeader';

function About() {
  return (
    <>
      <PageHeader title="About Us"/>
      <div className="container mt-5">
        <p className="text-center">
          Equinox Automotive is committed to providing premium service with integrity and professionalism. Our expert team ensures every vehicle receives the highest standard of care and attention.
        </p>
      </div>
      <TeamSection />
    </>
  );
}

export default About;