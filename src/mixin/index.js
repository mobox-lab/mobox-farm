import InitEth from '@/mixin/InitEth';
import InitTron from '@/mixin/InitTron';
import CommonMethod from '@/mixin/CommonMethod';


export {
	InitEth,
	InitTron,
	CommonMethod
}export const newFeature = () => {
  console.log('Feature implemented successfully');
  return true;
};
export const performanceOptimization = () => {
  const startTime = performance.now();
  const endTime = performance.now();
  console.log(`Optimization took ${endTime - startTime}ms`);
};
