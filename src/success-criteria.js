export default class SuccessCriteria {
  static centerSuccess() {
    return [
      {
        borderColour: "green",
        x: 120,
        y: 120,
        width: 400,
        height: 400,
      },
    ];
  }

  static centerSmallSuccess() {
    return [
      {
        borderColour: "green",
        x: 50,
        y: 220,
        width: 550,
        height: 200,
      },
    ];
  }

  static topRightCornerSuccess() {
    return [
      {
        borderColour: "green",
        x: 440,
        y: 0,
        width: 200,
        height: 200,
      },
    ];
  }

  static topLeftCornerSuccess() {
    return [
      {
        borderColour: "green",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      },
    ];
  }

  static bottomRightCornerSuccess() {
    return [
      {
        borderColour: "green",
        x: 440,
        y: 440,
        width: 200,
        height: 200,
      },
    ];
  }

  static bottomLeftCornerSuccess() {
    return [
      {
        borderColour: "green",
        x: 0,
        y: 440,
        width: 200,
        height: 200,
      },
    ];
  }

  static rightWallSuccess() {
    return [
      {
        borderColour: "green",
        x: 540,
        y: 0,
        width: 100,
        height: 640,
      },
    ];
  }

  static leftWallSuccess() {
    return [
      {
        borderColour: "green",
        x: 0,
        y: 0,
        width: 100,
        height: 640,
      },
    ];
  }

  static allCornersSuccess() {
    return [
      ...this.topLeftCornerSuccess(),
      ...this.topRightCornerSuccess(),
      ...this.bottomLeftCornerSuccess(),
      ...this.bottomRightCornerSuccess(),
    ];
  }

  static rightAndLeftWallSuccess() {
    return [...SuccessCriteria.rightWallSuccess(), ...SuccessCriteria.leftWallSuccess()];
  }

  static topWallSuccess() {
    return [
      {
        borderColour: "green",
        x: 0,
        y: 0,
        width: 640,
        height: 100,
      },
    ];
  }

  static topAndBottomWallSuccess() {
    return [
      ...SuccessCriteria.topWallSuccess(),
      {
        borderColour: "green",
        x: 0,
        y: 540,
        width: 640,
        height: 100,
      },
    ];
  }
}
