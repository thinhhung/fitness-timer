import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  milisecondsToSeconds,
  milisecondsToMinutes,
} from '../../utils/formatters';

import {
  colors,
  totalProgressBarProps,
  stepProgressBarProps,
  styles,
} from './styles';

export default class Timer extends React.Component {
  render() {
    const {
      stepColor,
      stepText,
      totalDoneRatio,
      stepDoneRatio,
      totalUntilTime,
      stepUntilTime,
      isStarted,
      prev,
      next,
      playTimer,
      pauseTimer,
    } = this.props;
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          {...totalProgressBarProps}
          prefill={0}
          fill={totalDoneRatio}
        >
          {
            (fill) => (
              <AnimatedCircularProgress
                {...stepProgressBarProps(stepColor)}
                prefill={0}
                fill={stepDoneRatio}
              >
                {
                  (fill) => (
                    <View style={styles.inner}>
                      <View style={styles.stepWrapper}>
                        <View style={styles.stepInner}>
                          <FontAwesomeIcon
                            name="angle-left"
                            style={styles.stepPrev}
                            onPress={prev}
                          />
                          <Text style={{...styles.step, color: stepColor}}>{stepText}</Text>
                          <FontAwesomeIcon
                            name="angle-right"
                            style={styles.stepNext}
                            onPress={next}
                          />
                        </View>
                      </View>
                      <Text style={styles.stepTimer}>{milisecondsToMinutes(stepUntilTime)}</Text>
                      <Text style={styles.totalTimer}>{milisecondsToSeconds(totalUntilTime)}</Text>
                      <View style={styles.controlButtonWrapper}>
                        {isStarted ? (
                          <Icon
                            name="pause"
                            size={50}
                            color={colors.rest}
                            onPress={pauseTimer}
                          />
                        ) : (
                          <Icon
                            name="play"
                            size={50}
                            color={colors.work}
                            onPress={playTimer}
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
