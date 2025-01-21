export const useAccountBalance = () => {
  const { CHAIN_NAMES } = useChain()

  const dotBalance = useBalance('dot', 'DOT')
  const dotAhBalance = useBalance('dotAh', 'DOT')
  const ksmBalance = useBalance('ksm', 'KSM')
  const ksmAhBalance = useBalance('ksmAh', 'KSM')

  return [
    { ...CHAIN_NAMES['dot'], asset: 'DOT', amount: dotBalance },
    { ...CHAIN_NAMES['dotAh'], asset: 'DOT', amount: dotAhBalance },
    { ...CHAIN_NAMES['ksm'], asset: 'KSM', amount: ksmBalance },
    { ...CHAIN_NAMES['ksmAh'], asset: 'KSM', amount: ksmAhBalance }
  ]
}
