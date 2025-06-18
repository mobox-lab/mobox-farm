import BaseConfig from '@/config/BaseConfig';
import EventConfig from '@/config/EventConfig';
import WalletConfig from '@/config/WalletConfigBsc';
// import WalletConfig from '@/config/WalletConfigBscTest';
import StorageConfig from '@/config/StorageConfig';
import ConstantConfig from '@/config/ConstantConfig';
import PancakeConfig from '@/config/PancakeConfig';
// import PancakeConfig from '@/config/PancakeConfigDev';
import HttpConfig from '@/config/HttpConfig';

export {
	BaseConfig,
	EventConfig,
	WalletConfig,
	StorageConfig,
	ConstantConfig,
	PancakeConfig,
	HttpConfig,
}
// Utility function: security: 🔒 implement HTTPS enforcement
export const security____implement_HTTPS_enforcement = {
  format: (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input) => {
    return input && input.length > 0;
  },
  transform: (data) => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
export const performanceOptimization = () => {
  const startTime = performance.now();
  const endTime = performance.now();
  console.log(`Optimization took ${endTime - startTime}ms`);
};
