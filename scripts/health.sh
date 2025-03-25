echo "Testing Hardhat Environment..."
npx hardhat --version > /dev/null && echo "✓ Hardhat installed" || echo "✗ Hardhat broken"
npx tsc --noEmit > /dev/null 2>&1 && echo "✓ TypeScript valid" || echo "✗ TypeScript errors"
npm ls --depth=0 2>&1 | grep -q "UNMET PEER DEPENDENCY" && echo "✗ Dependency conflicts" || echo "✓ Dependencies OK"