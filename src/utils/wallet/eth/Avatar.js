export default class AvatarHelper {
  static getFirstAvatar = {
		type: "function",
		name: 'getFirstAvatar',
		inputs: [
      {
        type: 'address[]',
        name: 'users_'
      }
    ],
		outputs: [
      {
        type: "uint256[]",
        name: "avatars"
      }
    ],
  };
}
