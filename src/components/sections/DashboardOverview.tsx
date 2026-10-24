import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import { StatCard } from '../ui/StatCard';
import { Package, CurrencyCircleDollar, WarningOctagon, ShoppingBag } from '@phosphor-icons/react';

export const DashboardOverview: React.FC = () => {
  const { totalProductsCount, overallInventoryTotal, lowStockCount, cartItemCount } = useProducts();

  return (
    <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 36px 24px' }}>
      {/* Small section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.25rem',
              color: '#87A9C2',
              fontWeight: 700,
            }}
          >
            inventory glance
          </span>
          <h2
            style={{
              fontSize: '1.45rem',
              fontFamily: "'Fredoka', sans-serif",
              color: '#3B596F',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            Workspace Metrics
          </h2>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
        }}
      >
        <StatCard
          label="Total Products"
          value={totalProductsCount}
          sublabel="Active SKUs in catalogue"
          icon={<Package size={22} weight="bold" />}
          variant="sky"
          delay={0}
        />
        <StatCard
          label="Inventory Value"
          value={formatCurrency(overallInventoryTotal)}
          sublabel="Total stock value (PHP)"
          icon={<CurrencyCircleDollar size={22} weight="bold" />}
          variant="powder"
          delay={0.08}
        />
        <StatCard
          label="Low Stock Items"
          value={lowStockCount}
          sublabel="Needs restock (qty < 5)"
          icon={<WarningOctagon size={22} weight="bold" />}
          variant="yellow"
          delay={0.16}
        />
        <StatCard
          label="Cart Items"
          value={cartItemCount}
          sublabel="Items ready for checkout"
          icon={<ShoppingBag size={22} weight="bold" />}
          variant="pink"
          delay={0.24}
        />
      </div>
    </section>
  );
};
