import React from 'react';

const MesVideos: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: "Mon projet 1",
      description: "Courte description du projet vidéo 1",
      embed: "https://www.youtube.com/embed/813XWFKj7L0"
    },
    {
      id: 2,
      title: "Mon projet 2",
      description: "Courte description du projet vidéo 2",
      embed: "https://www.youtube.com/embed/VIDEO_ID2"
    },
    // tu ajoutes autant de vidéos que tu veux
  ];

  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Mes Projets Vidéo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques-unes de mes réalisations en audiovisuel et montage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-lg shadow-lg overflow-hidden bg-gray-100"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={video.embed}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-700">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MesVideos;
