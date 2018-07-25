import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const PREP_COLOR = '#C86500';
const WORK_COLOR = '#03C03C';
const REST_COLOR = '#E60000';
const ROUND_REST_COLOR = '#E60000';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const rounds = 3;
    const exercises = 3;
    const prepTime = 5;
    const workTime = 30;
    const restTime = 5;
    const roundRestTime = 10;
    const totalTime = prepTime + rounds * (exercises * workTime + (exercises - 1) * restTime) + (rounds - 1) * roundRestTime;
    this.state = {
      rounds,
      exercises,
      prepTime,
      workTime,
      restTime,
      roundRestTime,
      totalTime,
      totalUntilTime: totalTime,
      currentRound: 0,
      currentExercise: 0,
      time: prepTime,
      until: prepTime,
      color: PREP_COLOR,
      text: 'PREP',
      isStarted: false,
    };
    this.playTimer = this.playTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.timerManager = this.timerManager();
  }

  componentDidMount() {
    this.timerManager.next();
  }

  playTimer() {
    // Update timer every 10 miliseconds
    this.timer = setInterval(this.updateTimer, 10);
    this.setState({ isStarted: true });
  }

  updateTimer() {
    const { totalUntilTime, totalTime, until } = this.state;

    if (totalUntilTime <= 0) {
      clearInterval(this.timer);
      return;
    }

    if (until <= 0) {
      this.timerManager.next();
      return;
    }

    this.setState({ totalUntilTime: totalUntilTime - 0.01, until: until - 0.01 });
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.setState({ isStarted: false });
  }

  timerManager = function* () {
    const { rounds, exercises } = this.state;
    yield this.startPrep();
    for (let r = 0; r < rounds; r++) {
      if (r !== 0) yield this.startRoundRest();
      for (let e = 0; e < exercises; e++) {
        if (e !== 0) yield this.startRest();
        yield this.startWork();
      }
    }
  };

  prev = () => {
    // Prev
    this.pauseTimer();
  };

  next = () => {
    this.timerManager.next();
    this.pauseTimer();
  };

  startPrep = () => {
    this.setState({
      time: this.state.prepTime,
      until: this.state.prepTime,
      color: PREP_COLOR,
      text: 'PREP',
    });
  };

  startWork = () => {
    this.setState({
      time: this.state.workTime,
      until: this.state.workTime,
      color: WORK_COLOR,
      text: 'WORK',
    });
  };

  startRest = () => {
    this.setState({
      time: this.state.restTime,
      until: this.state.restTime,
      color: REST_COLOR,
      text: 'REST',
    });
  };

  startRoundRest = () => {
    this.setState({
      time: this.state.roundRestTime,
      until: this.state.roundRestTime,
      color: ROUND_REST_COLOR,
      text: 'REST',
    });
  };

  formatNumber = (number) => number >= 10 ? number : `0${number}`;

  formatTime = (time, showMiliseconds = false) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = showMiliseconds
      ? Math.floor(time % 3600 % 60)
      : Math.ceil(time % 3600 % 60);
    const result = hours > 0
      ? `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`
      : `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;

    if (!showMiliseconds) return result;

    const miliseconds = Math.round((time - Math.floor(time)) * 100);
    return `${result}.${this.formatNumber(miliseconds)}`;
  }

  render() {
    const {
      rounds,
      exercises,
      prepTime,
      workTime,
      restTime,
      roundRestTime,
      totalTime,
      totalUntilTime,
      time,
      until,
      color,
      text,
      isStarted,
    } = this.state;
    const totalUntilPercentage = Math.floor((totalTime - totalUntilTime) * 100 / totalTime);
    const untilPercentage = Math.floor((time - until) * 100 / time);
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={200}
          width={2}
          rotation={0}
          prefill={0}
          fill={totalUntilPercentage}
          tintColor="#0048BA"
          backgroundWidth={2}
          backgroundColor="#C0C0C0"
        >
          {
            (fill) => (
              <AnimatedCircularProgress
                size={190}
                width={7}
                rotation={0}
                prefill={0}
                fill={untilPercentage}
                tintColor={color}
                backgroundWidth={1}
                backgroundColor={color}
              >
                {
                  (fill) => (
                    <View style={styles.progressContent}>
                      <View style={{ height: 30 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <FontAwesomeIcon
                            name="angle-left"
                            style={{ marginRight: 5 }}
                            onPress={this.prev}
                          />
                          <Text style={{ color, fontFamily: 'Helvetica', fontSize: 16 }}>{text}</Text>
                          <FontAwesomeIcon
                            name="angle-right"
                            style={{ marginLeft: 5 }}
                            onPress={this.next}
                          />
                        </View>
                      </View>
                      <Text style={{ fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 30, marginTop: 10 }}>{this.formatTime(until)}</Text>
                      <Text style={{ fontFamily: 'Helvetica', fontSize: 14 }}>{this.formatTime(totalUntilTime, true)}</Text>
                      <View style={{ marginTop: 10 }}>
                        {isStarted ? (
                          <Icon
                            name="pause"
                            size={50}
                            color={REST_COLOR}
                            onPress={this.pauseTimer}
                          />
                        ) : (
                          <Icon
                            name="play"
                            size={50}
                            color={WORK_COLOR}
                            onPress={this.playTimer}
                          />
                        )}
                      </View>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            )
          }
        </AnimatedCircularProgress>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
