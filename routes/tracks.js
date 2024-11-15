const express = require('express');
const Track = require('../models/track.js');
const router = express.Router();

// Create a track
router.post("/", async (req, res) => {
  try {
    const createdTrack = await Track.create(req.body);
    res.status(201).json(createdTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tracks
router.get("/", async (req, res) => {
  try {
    const foundTracks = await Track.find();
    res.status(200).json(foundTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single track
router.get('/:trackId', async (req, res) => {
  try {
    const track = await Track.findById(req.params.trackId);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a track
router.put('/:trackId', async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.trackId, req.body, {
      new: true,
    });
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a track
router.delete('/:trackId', async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.trackId);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
