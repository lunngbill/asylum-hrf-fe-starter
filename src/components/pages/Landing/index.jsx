import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import {decodeBase64} from '../../../utils/decodeBase64.js';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 30; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  const handleReadMore = () => {
    // TODO: navigate to the humanrightsfirst.org homepage
    window.open('https://www.humanrightsfirst.org', '_blank')
  };

  const handleViewData = () => {
    navigate('/search')
  }

  const handleDownloadData = () => {
    downloadCSV()
  }

  return (
    <div className="w-screen bg-white text-gray-900">
  
      {/*page title*/}
      <section className="px-20 py-16 text-center">
        <h2 className="text-5xl font-serif">
          Asylum Office Grant Rate Tracker
        </h2>
  
        <p className="mt-4 max-w-4xl mx-auto text-gray-600">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers,
          policymakers, and the public an interactive tool to explore USCIS data on
          Asylum Office decisions.
        </p>
      </section>
  
      {/*charts and graphs*/}
      <section className="px-20">
        <div className="grid grid-cols-3 gap-16 items-end text-center">
          <div>
            <img src={barGraph} className="mx-auto h-[200px]" />
            <p className="mt-4 text-sm">Search Grant Rates By Office</p>
          </div>
  
          <div>
            <img src={pieChart} className="mx-auto h-[220px]" />
            <p className="mt-4 text-sm">Search Grant Rates By Nationality</p>
          </div>
  
          <div>
            <img src={lineGraph} className="mx-auto h-[200px]" />
            <p className="mt-4 text-sm">Search Grant Rates Over Time</p>
          </div>
        </div>
      </section>
  
      {/*data buttons*/}
      <section className="mt-10 flex justify-center gap-6">
        <button
          onClick={handleViewData}
          className="px-6 py-2 bg-gray-600 text-white"
        >
          View the Data
        </button>
  
        <button
          onClick={handleDownloadData}
          className="px-6 py-2 bg-gray-400 text-white"
        >
          Download the Data
        </button>
      </section>
  
      {/*middle section*/}
      <section className="px-20 py-20 grid grid-cols-2 gap-16 items-center">
        <img src={paperStack} className="w-full" />
  
        <p className="text-gray-700 leading-relaxed">
          Human Rights First has created a search tool to give you a user-friendly
          way to explore a data set of asylum decisions between FY 2016 and May 2021
          by the USCIS Asylum Office, which we received through a Freedom of
          Information Act request. You can search for information on asylum grant
          rates by year, nationality, and asylum office, visualize the data with
          charts and heat maps, and download the data set.
        </p>
      </section>
  
      <section className="px-20 py-16 text-center">
        <h3 className="text-3xl font-serif mb-12">
          Systemic Disparity Insights
        </h3>
  
        <div className="grid grid-cols-3 gap-16">
          <div>
            <h4 className="text-2xl mb-2">36%</h4>
            <p className="text-sm text-gray-600">
              By the end of the Trump administration, the average asylum office
              grant rate had fallen 36%.
            </p>
          </div>
  
          <div>
            <h4 className="text-2xl mb-2">5%</h4>
            <p className="text-sm text-gray-600">
              The New York asylum office grant rate dropped to 5% in FY 2020.
            </p>
          </div>
  
          <div>
            <h4 className="text-2xl mb-2">6x Lower</h4>
            <p className="text-sm text-gray-600">
              New York’s average grant rate was six times lower than San Francisco’s.
            </p>
          </div>
        </div>
      </section>
  
      {/*bottom buttons*/}
      <section className="pb-20 text-center">
        <button
          onClick={handleReadMore}
          className="px-6 py-2 bg-gray-600 text-white"
        >
          Read More
        </button>
  
        <div className="mt-6">
          <button onClick={scrollToTop} className="text-sm">
            Back To Top ^
          </button>
        </div>
  
      </section>
  
    </div>
  );
  
};

