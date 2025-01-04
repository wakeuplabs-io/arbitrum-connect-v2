import ArbitrumIcon from '@/assets/arbitrum-icon.svg';
import { CustomArbitrumNetwork, useArbitrumNetworks } from '@/hooks/use-arbitrum-networks';
import cn from 'classnames';
import { ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import Modal from './modal';

interface SelectChainModalProps {
  isOpen: boolean;
  onSubmit?: () => void;
}

export function SelectChainModal({ isOpen, onSubmit }: SelectChainModalProps) {
  const { networks } = useArbitrumNetworks();
  return (
    <Modal isOpen={isOpen}>
      {/* Close modal */}
      <form method='dialog'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
      </form>

      <div className='flex flex-col justify-start w-full gap-6'>
        <div className='flex flex-col items-start w-full'>
          <p className=''>From</p>
          <p className='font-semibold text-2xl text-primary-700'>Select a Chain</p>
        </div>

        <div className='w-full bg-teal-800'>
          <p>searchbar</p>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          {networks.map((network) => {
            return <ListItem key={network.name} network={network} />;
          })}
        </div>

        <button className={cn('btn btn-primary rounded-2xl w-full')} onClick={onSubmit}>
          Add custom chain
        </button>
      </div>
    </Modal>
  );
}

interface ListItemProps {
  network: CustomArbitrumNetwork;
}

function ListItem(props: ListItemProps) {
  const [starSelected, setStarSelected] = useState(false);

  return (
    <div className='flex justify-between items-center h-[47px] group'>
      <div className='flex gap-4 items-center'>
        <div className='avatar'>
          <div className='w-8 rounded-full'>
            {/* HARDCODED: */}
            <img src={ArbitrumIcon} />
          </div>
        </div>
        <p className='leading-none h-4 overflow-visible'>{props.network.name}</p>
      </div>
      <div className='flex gap-2 items-center'>
        <Star
          color='#282930'
          fill={starSelected ? '#282930' : 'none'}
          height={17}
          onClick={() => setStarSelected(!starSelected)}
          className={cn('cursor-pointer group-hover:block', { hidden: !starSelected })}
        />
        <ChevronRight color='#9CA3AF' />
      </div>
    </div>
  );
}
