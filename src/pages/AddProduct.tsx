import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import type { ProductCategory, ProductFormData } from '../types/product';
import { formatCurrency } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { Button } from '../components/ui/Button';
import { HeartIcon } from '../components/decorations/HeartIcon';
import { PaperClip } from '../components/decorations/PaperClip';
import {
  UploadSimple,
  Sparkle,
  Star,
  CheckCircle,
  ArrowLeft,
  Image as ImageIcon,
} from '@phosphor-icons/react';

const CATEGORIES: ProductCategory[] = [
  'Electronics',
  'Accessories',
  'Stationery & Crafts',
  'Home & Workspace',
];

const PRESET_IMAGES = [
  {
    label: 'Digital Tablet',
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Pastel Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Cloud Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Scrapbook & Washi',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Desk Organizer',
    url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Pastel Pen Set',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
  },
];

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Stationery & Crafts',
    price: '',
    quantity: '',
    image: PRESET_IMAGES[3].url, // default cute preset
    description: '',
    specifications: '',
    rating: 5.0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute live subtotal preview
  const numPrice = Number(formData.price) || 0;
  const numQty = Number(formData.quantity) || 0;
  const liveSubtotal = calculateSubtotal(numPrice, numQty);

  // Image upload handler (base64)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Please select an image smaller than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.image;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate all fields
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a product category';
    }

    if (formData.price === '' || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0';
    }

    if (formData.quantity === '' || isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Please enter a valid quantity (0 or more)';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Feature image is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.specifications.trim()) {
      newErrors.specifications = 'Product specifications are required';
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please provide a rating between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const parsedSpecs = formData.specifications
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    addProduct({
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      image: formData.image,
      description: formData.description.trim(),
      specifications: parsedSpecs.length > 0 ? parsedSpecs : [formData.specifications.trim()],
      rating: Number(formData.rating),
      featured: true,
    });

    setTimeout(() => {
      navigate('/products');
    }, 600);
  };

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6F91AA',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#F3F9FC',
            border: '1px solid #DDECF3',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Header Container */}
      <div
        className="bg-grid-paper"
        style={{
          borderRadius: '20px',
          padding: '36px 24px',
          border: '2px dashed #B6DDEB',
          textAlign: 'center',
          marginBottom: '32px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.6rem', color: '#526A7C', fontWeight: 700 }}>
            new inventory entry
          </span>
          <HeartIcon size={18} color="#F5D7E5" outlineColor="#B8829F" />
        </div>

        <h1
          className="font-outlined"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: '0 0 8px 0',
            letterSpacing: '0.04em',
          }}
        >
          ADD NEW PRODUCT
        </h1>

        <p style={{ color: '#4F728A', fontSize: '0.96rem', maxWidth: '580px', margin: '0 auto', fontWeight: 500 }}>
          Fill in all required fields to dynamically register a new product, automatically compute subtotals, and update total inventory valuation.
        </p>
      </div>

      {/* Main Form Layout */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Left Column: Image Selection & Live Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Live Polaroid Preview Card */}
            <div
              className="polaroid-frame"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1.5px solid #D5E8F3',
                padding: '16px 16px 24px 16px',
                boxShadow: '0 10px 28px rgba(111, 145, 170, 0.15)',
                position: 'relative',
              }}
            >
              {/* Paperclip decoration */}
              <div style={{ position: 'absolute', top: '-20px', right: '24px', zIndex: 10 }}>
                <PaperClip color="#87A9C2" size={42} />
              </div>

              {/* Image Preview Box */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#EBF4F9',
                  border: '1.5px solid #DDECF3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#88A1B5', padding: '20px' }}>
                    <ImageIcon size={48} color="#87A9C2" />
                    <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem', marginTop: '6px' }}>
                      No image chosen yet
                    </p>
                  </div>
                )}
              </div>

              {/* Live Preview Specs */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem', color: '#658FA9', fontWeight: 700 }}>
                    {formData.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B57800', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Star size={13} weight="fill" color="#E69500" />
                    <span>{formData.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h4 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.15rem', color: '#3A5263', margin: '6px 0' }}>
                  {formData.name || 'Your Product Title'}
                </h4>

                {/* Subtotal Preview */}
                <div
                  style={{
                    backgroundColor: '#F5FAFD',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ color: '#6F91AA' }}>Computed Subtotal:</span>
                  <strong style={{ fontFamily: "'Fredoka', sans-serif", color: '#374A58' }}>
                    {formatCurrency(liveSubtotal)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Image Presets & Upload Picker */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #E2EFF6',
                padding: '20px',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.95rem',
                  color: '#4F728A',
                  marginBottom: '10px',
                }}
              >
                1. Feature Image Source *
              </label>

              {/* Upload Local File */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#F3F9FC',
                    border: '1.5px dashed #B8D8E8',
                    color: '#527A96',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <UploadSimple size={18} weight="bold" />
                  <span>Upload Image File from Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {/* Preset Image Swatches */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.8rem', color: '#88A1B5', display: 'block', marginBottom: '8px' }}>
                  Or pick one of these cute stationery presets:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, image: preset.url }));
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.image;
                          return updated;
                        });
                      }}
                      style={{
                        padding: '4px',
                        borderRadius: '8px',
                        border: formData.image === preset.url ? '2px solid #87A9C2' : '1px solid #DDECF3',
                        backgroundColor: '#FAFDFE',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        style={{ width: '100%', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <span style={{ fontSize: '0.72rem', color: '#526A7C', display: 'block', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Image URL input */}
              <div>
                <input
                  type="url"
                  placeholder="Or enter direct image URL (https://...)"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #DDECF3',
                    fontSize: '0.82rem',
                    color: '#3A5263',
                    outline: 'none',
                  }}
                />
              </div>

              {errors.image && (
                <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '6px', fontWeight: 600 }}>
                  ⚠️ {errors.image}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #E2EFF6',
              padding: '32px',
              boxShadow: '0 8px 24px -4px rgba(111, 145, 170, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Product Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.95rem',
                  color: '#4F728A',
                  marginBottom: '6px',
                }}
              >
                2. Product Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Pastel Cloud Wireless ANC Headphones"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: errors.name ? '1.5px solid #F5A9BC' : '1.5px solid #BFD9E7',
                  backgroundColor: '#FAFDFE',
                  color: '#374A58',
                  outline: 'none',
                  fontSize: '0.95rem',
                }}
              />
              {errors.name && (
                <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.95rem',
                  color: '#4F728A',
                  marginBottom: '6px',
                }}
              >
                3. Product Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, category: e.target.value as ProductCategory }));
                  if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
                }}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: errors.category ? '1.5px solid #F5A9BC' : '1.5px solid #BFD9E7',
                  backgroundColor: '#FAFDFE',
                  color: '#374A58',
                  outline: 'none',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ {errors.category}
                </p>
              )}
            </div>

            {/* Price & Quantity Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Price */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '0.95rem',
                    color: '#4F728A',
                    marginBottom: '6px',
                  }}
                >
                  4. Price (PHP ₱) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 1850"
                  value={formData.price}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    setFormData((prev) => ({ ...prev, price: val }));
                    if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
                  }}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    border: errors.price ? '1.5px solid #F5A9BC' : '1.5px solid #BFD9E7',
                    backgroundColor: '#FAFDFE',
                    color: '#374A58',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
                {errors.price && (
                  <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '4px', fontWeight: 600 }}>
                    ⚠️ {errors.price}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '0.95rem',
                    color: '#4F728A',
                    marginBottom: '6px',
                  }}
                >
                  5. Quantity in Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 10"
                  value={formData.quantity}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                    setFormData((prev) => ({ ...prev, quantity: val }));
                    if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: '' }));
                  }}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    border: errors.quantity ? '1.5px solid #F5A9BC' : '1.5px solid #BFD9E7',
                    backgroundColor: '#FAFDFE',
                    color: '#374A58',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
                {errors.quantity && (
                  <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '4px', fontWeight: 600 }}>
                    ⚠️ {errors.quantity}
                  </p>
                )}
              </div>
            </div>

            {/* Computed Subtotal Notification Callout */}
            <div
              style={{
                backgroundColor: '#FFFDD0',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1.5px solid #EADE96',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkle size={18} color="#9C8528" weight="fill" />
                <span style={{ fontSize: '0.9rem', color: '#6E5F1E', fontWeight: 600 }}>
                  Automatic Subtotal (Price × Quantity):
                </span>
              </div>
              <strong style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.15rem', color: '#574B16' }}>
                {formatCurrency(liveSubtotal)}
              </strong>
            </div>

            {/* Rating Selector (1 to 5 Stars) */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.95rem',
                  color: '#4F728A',
                  marginBottom: '6px',
                }}
              >
                6. Product Rating ({formData.rating.toFixed(1)} / 5.0) *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <Star
                      size={28}
                      weight={formData.rating >= star ? 'fill' : 'regular'}
                      color={formData.rating >= star ? '#E69500' : '#D1DFE8'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.95rem',
                  color: '#4F728A',
                  marginBottom: '6px',
                }}
              >
                7. Product Description *
              </label>
              <textarea
                rows={3}
                placeholder="Write a clear and welcoming description for this product..."
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                }}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: errors.description ? '1.5px solid #F5A9BC' : '1.5px solid #BFD9E7',
                  backgroundColor: '#FAFDFE',
                  color: '#374A58',
                  outline: 'none',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  resize: 'vertical',
                }}
              />
              {errors.description && (
                <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ {errors.description}
                </p>
              )}
            </div>

            {/* Specifications */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '0.95rem',
                  color: '#4F728A',
                  marginBottom: '4px',
                }}
              >
                8. Product Specifications *
              </label>
              <span style={{ fontSize: '0.78rem', color: '#88A1B5', display: 'block', marginBottom: '6px' }}>
                (Enter one specification feature per line)
              </span>
              <textarea
                rows={4}
                placeholder="e.g.&#10;10.9-inch 2K Matte Anti-Glare Paper Display&#10;Up to 14 Days Battery Life&#10;Includes Pressure Stylus and Protective Sleeve"
                value={formData.specifications}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, specifications: e.target.value }));
                  if (errors.specifications) setErrors((prev) => ({ ...prev, specifications: '' }));
                }}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: errors.specifications ? '1.5px solid #F5A9BC' : '1.5px solid #BFD9E7',
                  backgroundColor: '#FAFDFE',
                  color: '#374A58',
                  outline: 'none',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  resize: 'vertical',
                }}
              />
              {errors.specifications && (
                <p style={{ color: '#D6456B', fontSize: '0.82rem', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ {errors.specifications}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '8px' }}>
              <Button type="submit" variant="primary" fullWidth size="lg" disabled={isSubmitting}>
                <CheckCircle size={20} weight="bold" />
                <span>{isSubmitting ? 'Adding Product...' : 'Add Product to Inventory'}</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
