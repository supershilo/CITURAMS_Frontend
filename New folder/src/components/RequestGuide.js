import React from 'react';
import HomeFrame from '../components/HomeFrame';



const RequestGuide = () => {

  return (
    <div>
        <HomeFrame/>
      {/* Main Content */}
      <div className='mt-24 -ml-12'>
        <div className='ml-12'>
          <div className='ml-12'>
            {userData && (
              <>
                <p>Hello {userData.fname},</p>
                <p>Welcome to CIT-U Repair & Assets Management System</p>
              </>
            )}
          </div>
          <div className="p-12">
            <div className="bg-gray-200 p-16 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 flex justify-center">Request Guide</h2>

              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">REQUEST STEPS:</h3>

                <div className="mb-4">
                  <p className="font-bold">Step 1: Navigate to New Request Page</p>
                  <p>Click on the New Request button, located on the left side of the screen.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">Step 2: Filling out the Request Form</p>
                  <p>On the Request page, you'll find a form to submit your request. Fill in the necessary details in the form.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">Step 3: Submitting your Request</p>
                  <p>After completing the form, click the Submit button to send your request.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">Step 4: Viewing your Requests</p>
                  <p>After completing the form, you'll be directed to the "My Request" tab. Here, you can view all your submissions, check their status, and see any associated remarks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestGuide;
