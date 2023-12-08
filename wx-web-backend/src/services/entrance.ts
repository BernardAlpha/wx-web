import PoTruck from '@/utils/poTruck';
import daysMatter from '@/services/daysMatter';
import user from '@/services/user';

PoTruck.use('', daysMatter);
PoTruck.use('', user);

export default PoTruck;