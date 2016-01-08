import * as actionCreators from './action_creators';

// let lastUpdatedJediId = -1;

// export function populateJedisActor(state, dispatch) {
//   let jedis = state.get('darkJedis');
//   let firstEmptyIdx = jedis.findIndex(entry => entry.get('name') === undefined);

//   if (firstEmptyIdx === 0) {
//     let firstJedi = jedis.find(entry => entry.get('name') !== undefined);
//     let firstJediIdx = jedis.indexOf(firstJedi);

//   } else {
//     let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
//     let lastJediIdx = jedis.indexOf(lastJedi);
//     let nextId = lastJedi.get('apprentice').id;

//     if (nextId !== lastUpdatedJediId) {
//       if (lastJediIdx < 4 && nextId !== null) {
//         lastUpdatedJediId = nextId;
//         dispatch(actionCreators.fetchDarkJedi(nextId));
//       }
//     }
//   }
// }

export function fillListActor(state, dispatch) {
  let jedis = state.get('darkJedis');
  let firstJedi = jedis.find(entry => entry.get('name') !== undefined);
  let lastJedi = jedis.findLast(entry => entry.get('name') !== undefined);
  let endOfList = !(firstJedi.get('master') && lastJedi.get('apprentice'));
  let numOfJedis = jedis.count(entry => entry.get('name') !== undefined);

  if (!endOfList && numOfJedis < state.get('listSize')) {
    dispatch(actionCreators.populateJedis());
  }
}