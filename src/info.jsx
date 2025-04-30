import "./info.css"

const ProjectInfo = () => {
  return (
    <div className="info-container">
      <div className="info-header">
        <h1>AI Generated Face Detection</h1>
        <h2>Using DenseNet-121</h2>
      </div>

      <div className="info-section">
        <h3>About the Project</h3>
        <p>
          This project utilizes deep learning technology to detect AI-generated fake faces. We implemented a
          DenseNet-121 architecture to analyze facial features and detect manipulated or synthetically generated images
          with high accuracy.
        </p>
      </div>

      <div className="info-section">
        <h3>Technical Implementation</h3>
        <p>
          We trained our model on a diverse dataset of real and AI-generated faces, enabling it to identify subtle
          artifacts and inconsistencies that are typically present in synthetic images. The DenseNet-121 architecture
          was chosen for its efficient feature reuse and propagation capabilities, which are particularly useful for
          detecting the nuanced patterns in AI-generated faces.
        </p>
      </div>

      <div className="info-section">
        <h3>Project Team</h3>
        <div className="team-members">
          <div className="team-member">
            <div className="member-avatar">RS</div>
            <p>Rujit Shrestha HCE078BCT032</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">RS</div>
            <p>Roshna Shrestha HCE078BCT033</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">SA</div>
            <p>Sandhya Adhikari HCE078BCT038</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">KS</div>
            <p>Kalyan Subedi HCE078BCT018</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Academic Context</h3>
        <p>
          This project was developed as a minor project by Computer Engineering (BCT) students at Himalaya College of Engineering, Chyasal, Lalitpur (Affiliated to Tribhuvan University). It combines our knowledge of machine learning, computer vision, and web development to create a
          practical application for detecting increasingly sophisticated AI-generated imagery.
        </p>
      </div>

      <div className="info-section">
        <h3>How It Works</h3>
        <p>
          1. Upload an image through the interface
          <br />
          2. Our model processes the image using the trained DenseNet-121 algorithm
          <br />
          3. The system analyzes facial features and patterns to determine authenticity
          <br />
          4. Results are displayed with a confidence score indicating how certain the model is
        </p>
      </div>

      <div className="copyright">
        <p>© {new Date().getFullYear()} AI Generated Face Detection Project. All rights reserved.</p>
        <p>
          This work is protected under the Copyright Act 2059 (2002) of Nepal. Unauthorized reproduction, distribution,
          or modification of this software and its contents is prohibited without prior written permission from the
          copyright holders.
        </p>
      </div>
    </div>
  )
}

export default ProjectInfo
