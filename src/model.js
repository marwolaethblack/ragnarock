/* @flow */
import type { Track, EncodedTrack } from "./types";

import samples from "./samples.json";


export function initTracks() {
  return {
    "beats": [
      {id: 1, name: "beats/hihat-reso", vol: 1, muted: false, beats: initBeats(16)},
      {id: 2, name: "beats/hihat-plain", vol: 1, muted: false, beats: initBeats(16)},
      {id: 3, name: "beats/snare-vinyl01", vol: 1, muted: false, beats: initBeats(16)},
      {id: 4, name: "beats/kick-electro01", vol: 1, muted: false, beats: initBeats(16)}
    ],
    "accoustic_guitar": [
      {id: 1, name: "accoustic_guitar/A2A3", vol: 1, muted: false, beats: initBeats(16)},
      {id: 2, name: "accoustic_guitar/A3", vol: 1, muted: false, beats: initBeats(16)},
      {id: 3, name: "accoustic_guitar/B2", vol: 1, muted: false, beats: initBeats(16)},
      {id: 4, name: "accoustic_guitar/B3", vol: 1, muted: false, beats: initBeats(16)},
      {id: 5, name: "accoustic_guitar/B3B4", vol: 1, muted: false, beats: initBeats(16)},
      {id: 6, name: "accoustic_guitar/B4", vol: 1, muted: false, beats: initBeats(16)},
      {id: 7, name: "accoustic_guitar/C#3", vol: 1, muted: false, beats: initBeats(16)},
      {id: 8, name: "accoustic_guitar/C#3C#4", vol: 1, muted: false, beats: initBeats(16)},
      {id: 9, name: "accoustic_guitar/C#4", vol: 1, muted: false, beats: initBeats(16)},
      {id: 10, name: "accoustic_guitar/D#4", vol: 1, muted: false, beats: initBeats(16)},
      {id: 11, name: "accoustic_guitar/D3", vol: 1, muted: false, beats: initBeats(16)},
      {id: 12, name: "accoustic_guitar/D5", vol: 1, muted: false, beats: initBeats(16)},
      {id: 13, name: "accoustic_guitar/E2", vol: 1, muted: false, beats: initBeats(16)},
      {id: 14, name: "accoustic_guitar/E4", vol: 1, muted: false, beats: initBeats(16)},
      {id: 15, name: "accoustic_guitar/F2", vol: 1, muted: false, beats: initBeats(16)},
      {id: 16, name: "accoustic_guitar/F2F3", vol: 1, muted: false, beats: initBeats(16)},
    ],
    "piano": [
      {id: 1, name: "piano/a", vol: 1, muted: false, beats: initBeats(16)},
      {id: 2, name: "piano/b", vol: 1, muted: false, beats: initBeats(16)},
      {id: 3, name: "piano/c", vol: 1, muted: false, beats: initBeats(16)},
      {id: 4, name: "piano/d", vol: 1, muted: false, beats: initBeats(16)},
      {id: 5, name: "piano/e", vol: 1, muted: false, beats: initBeats(16)},
      {id: 6, name: "piano/f", vol: 1, muted: false, beats: initBeats(16)},
      {id: 7, name: "piano/g", vol: 1, muted: false, beats: initBeats(16)}
    ],
    "drums": [
      {id: 1, name: "drums/kick", vol: 1, muted: false, beats: initBeats(16)},
      {id: 2, name: "drums/snare", vol: 1, muted: false, beats: initBeats(16)},
      {id: 3, name: "drums/hat", vol: 1, muted: false, beats: initBeats(16)}
    ],
  }
}

export function initBeats(n: number): boolean[] {
  return new Array(n).fill(false);
}

export function addTrack(tracks, category) {

  const id = Math.max.apply(null, tracks[category].map(t => t.id)) + 1;
  const getDefaultTrack = (category) => {
    return samples[category][0];
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

  const tracks = Object.keys(samples).reduce((acc, group) => {
    const nT = Math.floor(2 + (Math.random() * (samples[group].length/10) ));
    console.log("group", group, nT);
    let groupTracks = [];  

    new Array(nT).fill().forEach((_, i) => {
      const trackName = samples[group][Math.floor(Math.random() * samples[group].length)];
      if(groupTracks.includes(track => track.name === trackName)) {
        return groupTracks;
      }

      const newTrack = {
        id: i + 1,
        name: trackName,
        vol: Math.random(),
        muted: false,
        beats: initBeats(16).map(_ => Math.random() > .75),
      }
      groupTracks = [...groupTracks, newTrack];
    });

    return  {...acc, [group]: groupTracks}
  }, {})

  console.log("random tracks", tracks)
  return tracks;
}

export function randomSong() {
  return {
    bpm: Math.floor(Math.random() * 75) + 75,
    tracks: randomTracks(),
  };
}
