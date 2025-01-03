import { ourCustomNetwork } from '@/constants/custom-network';
import { useArbitrumNetworks } from '@/hooks/use-arbitrum-networks';
import { createFileRoute } from '@tanstack/react-router';
import cn from 'classnames';
import { useState } from 'react';
import { isAddress } from 'viem';
import { z } from 'zod';

export const Route = createFileRoute('/custom/')({
  component: CustomNetworkScreen,
});

function CustomNetworkScreen() {
  const [name, setName] = useState('');
  const [chainId, setChainId] = useState(1);
  const [parentChainId, setParentChainId] = useState(1);
  const [confirmPeriodBlocks, setConfirmPeriodBlocks] = useState(1);
  const [bridge, setBridge] = useState('');
  const [inbox, setInbox] = useState('');
  const [sequencerInbox, setSequencerInbox] = useState('');
  const [outbox, setOutbox] = useState('');
  const [rollup, setRollup] = useState('');
  const [error, setError] = useState<string>('');
  const { addNetwork } = useArbitrumNetworks();

  function setSomeValues() {
    setName(ourCustomNetwork.name);
    setChainId(ourCustomNetwork.chainId);
    setParentChainId(ourCustomNetwork.parentChainId);
    setConfirmPeriodBlocks(ourCustomNetwork.confirmPeriodBlocks);
    setBridge(ourCustomNetwork.ethBridge.bridge);
    setInbox(ourCustomNetwork.ethBridge.inbox);
    setSequencerInbox(ourCustomNetwork.ethBridge.sequencerInbox);
    setOutbox(ourCustomNetwork.ethBridge.outbox);
    setRollup(ourCustomNetwork.ethBridge.rollup);
  }

  function resetValues() {
    setName('');
    setChainId(1);
    setParentChainId(1);
    setConfirmPeriodBlocks(1);
    setBridge('');
    setInbox('');
    setSequencerInbox('');
    setOutbox('');
    setRollup('');
  }

  function handleSubmit() {
    try {
      const validated = formSchema.safeParse({
        name,
        chainId,
        parentChainId,
        bridge,
        inbox,
        sequencerInbox,
        outbox,
        rollup,
        confirmPeriodBlocks,
      });

      if (!validated.success) {
        triggerError(validated.error.message);
        return;
      } else {
        setError('');
      }

      addNetwork({
        name,
        chainId,
        parentChainId,
        ethBridge: {
          bridge,
          inbox,
          sequencerInbox,
          outbox,
          rollup,
        },
        confirmPeriodBlocks,
        isCustom: true,
        isTestnet: true,
      });
    } catch (error: any) {
      triggerError(error.message);
    }
  }
  function triggerError(errorMessage: string) {
    setError(errorMessage);
  }

  return (
    <>
      <form
        className='max-w-xl mx-auto'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
      >
        <h2 className='text-2xl font-bold'>Add custom chain</h2>
        <hr />
        <div className='flex flex-col gap-2'>
          <TextInput label='Name' id='name' value={name} setValue={setName} />
          <NumberInput label='Chain ID' id='chainId' value={chainId} setValue={setChainId} />
          <NumberInput label='Parent Chain ID' id='parentChainId' value={parentChainId} setValue={setParentChainId} />
          <NumberInput
            label='Confirm Period Blocks'
            id='confirmPeriodBlocks'
            value={confirmPeriodBlocks}
            setValue={setConfirmPeriodBlocks}
          />

          <h4 className='text-xl font-bold'>Ethereum Bridge</h4>
          <TextInput label='Rollup Address' id='rollup' value={rollup} setValue={setRollup} />
          <TextInput label='Inbox Address' id='inbox' value={inbox} setValue={setInbox} />
          <TextInput label='Sequencer Inbox Address' id='sequencerInbox' value={sequencerInbox} setValue={setSequencerInbox} />
          <TextInput label='Outbox Address' id='outbox' value={outbox} setValue={setOutbox} />
          <TextInput label='Bridge Address' id='bridge' value={bridge} setValue={setBridge} />

          {Boolean(error) && <span className='text-red-500'>{error}</span>}

          <button
            id='continue-btn'
            type='submit'
            className={cn('btn btn-primary font-normal rounded-3xl text-neutral-100 disabled:text-neutral-400 disabled:bg-neutral-200', {
              'animate-shake': error,
            })}
          >
            Add
          </button>
          <button
            id='continue-btn'
            onClick={(e) => {
              e.preventDefault();
              setSomeValues();
            }}
            className={cn('btn btn-primary font-normal rounded-3xl text-neutral-100 disabled:text-neutral-400 disabled:bg-neutral-200', {
              'animate-shake': error,
            })}
          >
            Set some values
          </button>
          <button
            id='continue-btn'
            onClick={(e) => {
              e.preventDefault();
              resetValues();
            }}
            className={cn('btn btn-primary font-normal rounded-3xl text-neutral-100 disabled:text-neutral-400 disabled:bg-neutral-200', {
              'animate-shake': error,
            })}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}

function InputWrapper({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col items-start'>{children}</div>;
}

interface TextInputProps {
  label: string;
  id: string;
  value: string;
  setValue: (value: string) => void;
}

function TextInput(props: TextInputProps) {
  return (
    <InputWrapper>
      <label htmlFor={props.id} className='label font-bold'>
        {props.label}
      </label>
      <input
        type='text'
        id={props.id}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        className='input input-sm flex-1 w-full'
      />
    </InputWrapper>
  );
}

interface NumberInputProps {
  label: string;
  id: string;
  value: number;
  setValue: (value: number) => void;
}

function NumberInput(props: NumberInputProps) {
  return (
    <InputWrapper>
      <label htmlFor={props.id} className='label font-bold'>
        {props.label}
      </label>
      <input
        type='number'
        id={props.id}
        value={props.value}
        onChange={(e) => props.setValue(parseInt(e.target.value))}
        className='input input-sm'
      />
    </InputWrapper>
  );
}

const addressSchema = z.string().refine((val) => isAddress(val, { strict: false }), { message: 'Invalid address' });

const formSchema = z.object({
  name: z.string().min(1),
  chainId: z.number().min(1),
  parentChainId: z.number().min(1),
  bridge: addressSchema,
  inbox: addressSchema,
  sequencerInbox: addressSchema,
  outbox: addressSchema,
  rollup: addressSchema,
  confirmPeriodBlocks: z.number().min(1),
});
