import { StyleSheet } from 'react-native';

export const colors = {
  prep: '#E60000',
  work: '#03C03C',
  rest: '#E60000',
};

export const totalProgressBarProps = {
  size: 200,
  width: 2,
  rotation: 0,
  tintColor: '#0048BA',
  backgroundWidth: 2,
  backgroundColor: '#C0C0C0',
};

export const stepProgressBarProps = color => ({
  size: 190,
  width: 7,
  rotation: 0,
  backgroundWidth: 1,
  tintColor: color,
  backgroundColor: color,
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepWrapper: {
    height: 30,
  },
  stepInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepPrev: {
    marginRight: 5,
  },
  stepNext: {
    marginLeft: 5,
  },
  step: {
    fontFamily: 'Helvetica',
    fontSize: 16,
  },
  stepTimer: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
  },
  totalTimer: {
    fontFamily: 'Helvetica',
    fontSize: 14,
  },
  controlButtonWrapper: {
    marginTop: 10,
  },
});
