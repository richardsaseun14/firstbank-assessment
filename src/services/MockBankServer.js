const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

export default class MockBankServer {
  async submitIdentityUpdate(values, outcome) {
    await wait(1000)
    const ninOutcomes = {
      '1111': 'success',
      '2222': 'failure',
      '3333': 'additional-document',
      '4444': 'account-information',
    }
    const outcomes = [
      'success',
      'failure',
      'additional-document',
      'account-information',
    ]
    return {
      status: outcomes.includes(outcome)
        ? outcome
        : (ninOutcomes[values.nin.slice(-4)] ?? 'success'),
    }
  }

  async confirmAccountAndSendOtp(accountNumber) {
    await wait(1200)

    if (!/^\d{10}$/.test(accountNumber) || /^0+$/.test(accountNumber)) {
      return {
        success: false,
        message:
          'We could not find an account with that number. Check it and try again.',
      }
    }

    return {
      success: true,
      account: {
        accountNumber,
        accountName: 'Ada Okafor',
        accountType: 'Savings',
        status: 'Active',
        phoneNumber: '+23480**78',
        email: 'ade****yu@gmail.com',
      },
      message: 'OTP sent successfully.',
    }
  }

  async verifyOtp(accountNumber, code) {
    await wait(500)

    if (!/^\d{10}$/.test(accountNumber)) {
      return {
        success: false,
        message: 'Confirm your account number before verifying the OTP.',
      }
    }

    if (code !== '123456') {
      return {
        success: false,
        message: 'That code is incorrect. Check it and try again.',
      }
    }

    return { success: true }
  }
}
