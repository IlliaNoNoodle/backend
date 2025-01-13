const { SpeechClient } = require('@google-cloud/speech');
const client = new SpeechClient();

// Обробка аудіо файлів
const audioToText = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No audio file uploaded' });

  const audio = req.file.buffer;
  const audioRequest = {
    audio: { content: audio.toString('base64') },
    config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
  };

  try {
    const [response] = await client.recognize(audioRequest);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    res.json({ transcription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing audio' });
  }
};

module.exports = { audioToText };
