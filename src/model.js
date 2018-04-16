/* @flow */
import type { Track, EncodedTrack } from "./types";

import samples from "./samples.json";


export function initTracks() {
  return {
    "beats": [
      {id: 1, name: "hihat-reso", vol: .4, muted: false, beats: initBeats(16)},
      {id: 2, name: "hihat-plain", vol: .4, muted: false, beats: initBeats(16)},
      {id: 3, name: "snare-vinyl01", vol: .9, muted: false, beats: initBeats(16)},
      {id: 4, name: "kick-electro01", vol: .8, muted: false, beats: initBeats(16)},
    ],
    "guitar": [],
    "drums": [],
    "piano": []
  }
}

export function initBeats(n: number): boolean[] {
  return new Array(n).fill(false);
}

export function addTrack(tracks, category) {
  const id = Math.max.apply(null, tracks[category].map(t => t.id)) + 1;
  const getDefaultTrack = (category) => {
    switch(category){
      case "beats":
      default: {
        return "kick-electro01";
      }
    }
  }
  const newTrack = {
    id,
    name: getDefaultTrack(category),
    vol: .8,
    muted: false,
    beats: initBeats(16),
  }

  return  {...tracks, [category]: [...tracks[category], newTrack]}
}

export function clearTrack(tracks, id: number, category) {

  const updatedInstrumentTracks = tracks[category].map(track => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, beats: initBeats(16)};
    }
  });

  return {...tracks, [category]: updatedInstrumentTracks}
}

export function deleteTracks(tracks, id: number, category) {
  const updatedInstrumentTracks = tracks[category].filter((track) => track.id !== id);
  return {...tracks, [category]: updatedInstrumentTracks};
}

export function toggleTrackBeat(tracks, id: number, beat: number, category) {

  const updatedInstrumentTracks = tracks[category].map(track => {
    if (track.id !== id) {
      return track;
    } else {
      return {
        ...track,
        beats: track.beats.map((v, i) => i !== beat ? v : !v)
      };
    }
  });

  return {...tracks, [category]: updatedInstrumentTracks}
}

export function setTrackVolume(tracks, id: number, vol: number, category) {

  const updatedInstrumentTracks = tracks[category].map(track => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, vol};
    }
  });

  return {...tracks, [category]: updatedInstrumentTracks}
}

export function muteTrack(tracks, id: number, category) {

  const updatedInstrumentTracks = tracks[category].map(track => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, muted: !track.muted};
    }
  });

  return {...tracks, [category]: updatedInstrumentTracks}
}

export function updateTrackSample(tracks, id: number, sample: string, category) {

  const updatedInstrumentTracks = tracks[category].map(track => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, name: sample};
    }
  });

  return {...tracks, [category]: updatedInstrumentTracks}
}

function encodeBeats(beats: boolean[]): string {
  return beats.map(beat => beat ? "1" : "0").join("");
}

function decodeBeats(encodedBeats: string): boolean[] {
  return encodedBeats.split("").map(beat => beat === "1");
}

export function encodeTracks(tracks): EncodedTrack[] {
  const encoded = Object.keys(tracks).map(category => {
    return tracks[category].map(({beats, ...track}) => {
      return {...track, beats: encodeBeats(beats)};
    });
  });

  console.log('encodeTracks', encoded);
  return encoded;
}

export function decodeTracks(encodedTracks: EncodedTrack[]) {
  const decoded = Object.keys(encodedTracks).map(category => {
    return encodedTracks[category].map(({beats, ...track}) => {
      return {...track, beats: decodeBeats(beats)};
    });
  });

  console.log('decodeTracks', decoded);
  return decoded;

  // return encodedTracks.map(({beats, ...encodedTrack}) => {
  //   return {...encodedTrack, beats: decodeBeats(beats)};
  // });
}

export function randomTracks() {
  const nT = Math.floor(3 + (Math.random() * 10));
  return new Array(nT).fill().map((_, i) => {
    return {
      id: i + 1,
      name: samples[Math.floor(Math.random() * samples.length)],
      vol: Math.random(),
      muted: false,
      beats: initBeats(16).map(_ => Math.random() > .75),
    }
  });
}

export function randomSong(): {bpm: number, tracks: Track[]} {
  return {
    bpm: Math.floor(Math.random() * 75) + 75,
    tracks: randomTracks(),
  };
}
