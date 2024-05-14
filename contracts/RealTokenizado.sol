// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RealDigital.sol";
import "./AddressDiscovery.sol";
import "./RealDigitalDefaultAccount.sol";
import "./SwapOneStep.sol";
import "./SwapTwoSteps.sol";
import "hardhat/console.sol";

contract RealTokenizado is RealDigital {
    bytes32 internal constant ACCESS_FREEZER_MOVER_ADMIN =
        keccak256("ACCESS_FREEZER_MOVER_ADMIN_ROLE");
    AddressDiscovery internal immutable addressDiscovery;
    uint256 public cnpj8;
    address public reserve;
    string public participant;

    constructor(
        AddressDiscovery _ad,
        string memory _name,
        string memory _symbol,
        address _authority,
        address _admin,
        string memory _participant,
        uint256 _cnpj8,
        address _reserve
    ) RealDigital(_name, _symbol, _authority, _admin) {
        addressDiscovery = _ad;
        participant = _participant;
        cnpj8 = _cnpj8;
        reserve = _reserve;

        _setRoleAdmin(ACCESS_ROLE, ACCESS_FREEZER_MOVER_ADMIN);
        _setRoleAdmin(FREEZER_ROLE, ACCESS_FREEZER_MOVER_ADMIN);
        _setRoleAdmin(MOVER_ROLE, ACCESS_FREEZER_MOVER_ADMIN);

        _grantRole(ACCESS_FREEZER_MOVER_ADMIN, _admin);
        RealDigitalDefaultAccount rdda = getRealDigitalDefaultAccount();
        _grantRole(ACCESS_FREEZER_MOVER_ADMIN, address(rdda));

        address swapOneStep = addressDiscovery.addressDiscovery(
            keccak256("SwapOneStep")
        );
        require(
            swapOneStep != address(0),
            "RealTokenizado: SwapOneStep not found"
        );
        _grantRole(MINTER_ROLE, swapOneStep);
        _grantRole(BURNER_ROLE, swapOneStep);

        address swapTwoSteps = addressDiscovery.addressDiscovery(
            keccak256("SwapTwoSteps")
        );
        require(
            swapTwoSteps != address(0),
            "RealTokenizado: SwapTwoSteps not found"
        );
        _grantRole(MINTER_ROLE, swapTwoSteps);
        _grantRole(BURNER_ROLE, swapTwoSteps);
        _grantRole(FREEZER_ROLE, swapTwoSteps);
    }

    function updateReserve(address _newReserve) public {
        RealDigitalDefaultAccount rdda = getRealDigitalDefaultAccount();
        address _defaultAccount = rdda.defaultAccount(cnpj8);
        require(
            _defaultAccount != address(0),
            "RealTokenizado: Default account not found"
        );
        require(
            _msgSender() == _defaultAccount,
            "RealTokenizado: caller is not the default account"
        );
        reserve = _newReserve;
    }

    function getRealDigitalDefaultAccount()
        internal
        view
        returns (RealDigitalDefaultAccount)
    {
        address rdda = addressDiscovery.addressDiscovery(
            keccak256("RealDigitalDefaultAccount")
        );
        require(
            rdda != address(0),
            "RealTokenizado: RealDigitalDefaultAccount not found"
        );
        return RealDigitalDefaultAccount(rdda);
    }
}
