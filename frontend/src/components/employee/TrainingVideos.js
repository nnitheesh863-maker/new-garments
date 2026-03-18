import React, { useState } from 'react';
import './TrainingVideos.css';

const TrainingVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'Machine Operation Basics',
      instructor: 'Training Dept',
      duration: '15 min',
      thumbnail: 'https://img.youtube.com/vi/u5WYFqYR-rY/maxresdefault.jpg',
      videoId: 'u5WYFqYR-rY',
      description: 'Learn the fundamentals of machine operation and safety procedures.'
    },
    {
      id: 2,
      title: 'Quality Control Standards',
      instructor: 'Quality Team',
      duration: '20 min',
      thumbnail: 'https://img.youtube.com/vi/2PJII-fOnp4/maxresdefault.jpg',
      videoId: '2PJII-fOnp4',
      description: 'Understanding quality standards and inspection procedures.'
    }
  ];

  return (
    <div className="fade-in training-videos">
      <h2 className="mb-4">
        <i className="fas fa-graduation-cap me-2"></i>
        Training Videos
      </h2>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => { setSelectedVideo(null); setIsPlaying(false); }}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => { setSelectedVideo(null); setIsPlaying(false); }}>
              <i className="fas fa-times"></i>
            </button>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h4>{selectedVideo.title}</h4>
              <p>{selectedVideo.description}</p>
              <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)}>
                <i className={`fas fa-${isPlaying ? 'pause' : 'play'} me-2`}></i>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="row">
        {videos.map((video, idx) => (
          <div key={video.id} className="col-md-6 col-lg-3 mb-4">
            <div className="video-card glass-card card-hover" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="video-thumbnail" onClick={() => setSelectedVideo(video)}>
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-overlay">
                  <i className="fas fa-play"></i>
                </div>
                <span className="duration">{video.duration}</span>
              </div>
              <div className="video-details">
                <h6>{video.title}</h6>
                <p className="text-muted small">{video.instructor}</p>
                <button
                  className="btn btn-sm btn-outline-primary w-100"
                  onClick={() => setSelectedVideo(video)}
                >
                  <i className="fas fa-play me-1"></i> Watch Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Progress */}
      <div className="dashboard-card mt-4">
        <h5>Your Progress</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-between mb-2">
              <span>Overall Progress</span>
              <span>45%</span>
            </div>
            <div className="progress" style={{ height: '15px' }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between mb-2">
              <span>Courses Completed</span>
              <span>2/4</span>
            </div>
            <div className="progress" style={{ height: '15px' }}>
              <div className="progress-bar bg-success" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingVideos;
